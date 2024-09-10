import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSynapseContext } from "synapse-react-client";

import { FileHandleAssociateType } from "@sage-bionetworks/synapse-types";

// https://www.npmjs.com/package/d3
// https://d3-graph-gallery.com/network.html

interface Person {
  name: string;
  team: string;
  image: string;
}

interface CustomNode extends d3.SimulationNodeDatum {
  id: string;
  group: "team" | "person";
  team?: string;
  image?: string;
}

interface CustomLink extends d3.SimulationLinkDatum<CustomNode> {
  source: string;
  target: string;
}

export declare type NetworkProps = {
  searchParams?: any;
  component?: React.ComponentType<any>;
};

const NetworkPage = () => {
  const [nodes, setNodes] = useState<CustomNode[]>([]);
  const [links, setLinks] = useState<CustomLink[]>([]);
  const { accessToken } = useSynapseContext();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tableId = "syn62530132";
  const query = `SELECT TRIM(CONCAT(COALESCE(firstName, ''), ' ', COALESCE(lastName, ''))) AS "fullName", role, affiliation, image, team FROM syn62530132`;

  // https://rest-docs.synapse.org/rest/POST/fileHandle/batch.html
  // image file handle IDs to their corresponding URL
  const fetchFileHandleUrls = async (
    fileHandleIds: string[],
    accessToken: string
  ): Promise<{ [key: string]: string }> => {
    try {
      const response = await fetch(
        "https://repo-prod.prod.sagebase.org/file/v1/fileHandle/batch",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestedFiles: fileHandleIds.map((id) => ({
              fileHandleId: id,
              associateObjectId: "syn62530132",
              associateObjectType: FileHandleAssociateType.TableEntity,
            })),
            includePreSignedURLs: true,
            includeFileHandles: false,
            includePreviewPreSignedURLs: false,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `Failed to fetch file handle URLs: ${errorResponse.reason}`
        );
      }

      const data = await response.json();
      const urls: { [key: string]: string } = {}; // fileHandleId: url

      data.requestedFiles.forEach((fileHandle: any) => {
        if (fileHandle.preSignedURL) {
          urls[fileHandle.fileHandleId] = fileHandle.preSignedURL;
        }
      });

      return urls;
    } catch (error) {
      console.error("Error fetching file handle URLs:", error.message);
      return {};
    }
  };

  // https://rest-docs.synapse.org/rest/POST/entity/id/table/query/async/start.html
  // query Synapse table - people, teams, images
  const fetchData = async (tableId: string, accessToken: string) => {
    try {
      const response = await fetch(
        `https://repo-prod.prod.sagebase.org/repo/v1/entity/${tableId}/table/query/async/start`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: {
              sql: query,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to start query: ${errorResponse.reason}`);
      }

      const { token: asyncJobId } = await response.json();

      let isJobComplete = false;
      let queryResults: any = null;

      // polling
      while (!isJobComplete) {
        const getResultResponse = await fetch(
          `https://repo-prod.prod.sagebase.org/repo/v1/entity/${tableId}/table/query/async/get/${asyncJobId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!getResultResponse.ok) {
          const errorResponse = await getResultResponse.json();
          throw new Error(
            `Failed to get query results: ${errorResponse.reason}`
          );
        }

        queryResults = await getResultResponse.json();
        console.log(queryResults);

        if (queryResults.jobState === "FAILED") {
          throw new Error(`Query job failed: ${queryResults.errorMessage}`);
        } else if (queryResults.jobState === "PROCESSING") {
          console.log("Query job still processing...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else if (queryResults.jobState === "COMPLETE") {
          isJobComplete = true;
        } else {
          isJobComplete = true;
        }
      }

      const rows = queryResults.queryResult.queryResults.rows || [];
      const people: Person[] = [];
      const teams: Set<string> = new Set();
      const fileHandleIds: string[] = [];

      rows.forEach(async (row: any) => {
        const name = row.values[0];
        const team = row.values[4];
        const imageId = row.values[3];

        if (imageId) {
          fileHandleIds.push(imageId);
        }

        people.push({ name, team, image: imageId });
        teams.add(team);
      });

      const fileHandleUrls =
        fileHandleIds.length > 0
          ? await fetchFileHandleUrls(fileHandleIds, accessToken)
          : {};

      const nodes: CustomNode[] = [
        ...Array.from(teams).map((team) => ({
          id: team,
          group: "team" as const,
        })),

        ...people.map((person) => ({
          id: person.name,
          group: "person" as const,
          team: person.team,
          image: person.image ? fileHandleUrls[person.image] : undefined,
        })),
      ];

      const links: CustomLink[] = people.map((person) => ({
        source: person.name,
        target: person.team,
      }));

      setNodes(nodes);
      setLinks(links);
    } catch (error) {
      console.error("Error starting query:", error.message);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchData(tableId, accessToken);
    } else {
      console.error("Access token not available");
    }
  }, [accessToken]);

  useEffect(() => {
    if (!nodes.length || !links.length) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%");

    const width = svgRef.current!.clientWidth;
    const height = svgRef.current!.clientHeight;

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 1.8]) // min 40% zoom, max 180% zoom
      .on("zoom", (event) => {
        // event listener that triggers when user zoom/pans
        svg
          .selectAll<SVGGElement, unknown>("g")
          .attr("transform", event.transform);
      });

    svg.call(zoom as any);

    /* Create force simulation (algorithm that applies different forces to position nodes) */
    const simulation = d3
      .forceSimulation<CustomNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<CustomNode, CustomLink>(links)
          .id((d) => d.id)
          .distance(8)
          .strength(0.3)
      )
      .force("charge", d3.forceManyBody().strength(-7)) // negative number for nodes to repel each other and spread out
      .force("center", d3.forceCenter(width / 2, height / 2)) // center graph, x and y midpoint
      .force(
        "collision",
        d3
          .forceCollide() // avoid node overlap
          .radius((d) => ((d as CustomNode).group === "team" ? 30 : 40)) //  sets the radius of the collision detection
      );

    const link = svg
      .append("g") // add svg element to svg container
      .attr("class", "links") // set links as class
      .selectAll("line") // select all line elements if they exist
      .data(links) // bind links data array to line elements
      .enter() // new selection for incoming data
      .append("line") // create line element for each link
      .attr("stroke-width", 1.5)
      .attr("stroke", "#999");

    const personNodesWithImage = svg
      .append("g")
      .attr("class", "person-nodes")
      .selectAll("image")
      .data(nodes) // binds nodes data array to image elements
      .enter()
      .append("image")
      .filter((d) => d.group === "person" && d.image !== undefined)
      .attr("xlink:href", (d) => (d as CustomNode).image!) // url of image
      .attr("x", -22)
      .attr("y", -22)
      .attr("width", 45)
      .attr("height", 45)
      .attr("clip-path", "circle(17px at center)");

    const personNodesWithoutImage = svg
      .append("g")
      .attr("class", "person-nodes")
      .selectAll("circle")
      .data(nodes.filter((d) => d.group === "person" && !d.image))
      .enter()
      .append("circle")
      .attr("r", 22)
      .attr("fill", "#385D7F");

    const personLabels = svg
      .append("g")
      .attr("class", "person-labels")
      .selectAll("text")
      .data(nodes.filter((d) => d.group === "person"))
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", -25)
      .text((d) => d.id)
      .attr("class", "person-label")
      .style("pointer-events", "none")
      .style("visibility", "hidden");

    const teamNodes = svg
      .append("g")
      .attr("class", "team-nodes")
      .selectAll("circle")
      .data(nodes.filter((d) => d.group === "team"))
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#FF6C2F")
      .on("mouseover", (event, d) => {
        if (d.group === "team") {
          svg
            .selectAll<SVGTextElement, CustomNode>("text.person-label")
            .filter((node) => node.team === d.id)
            .style("visibility", "visible");
        }
      })
      .on("mouseout", () => {
        svg
          .selectAll<SVGTextElement, CustomNode>("text.person-label")
          .style("visibility", "hidden");
      });

    const teamLabels = svg
      .append("g")
      .attr("class", "team-labels")
      .selectAll("text")
      .data(nodes.filter((d) => d.group === "team"))
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .text((d) => d.id)
      .attr("class", "team-label")
      .style("pointer-events", "none");

    // position nodes and update their positions on each tick event
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as unknown as CustomNode).x!)
        .attr("y1", (d) => (d.source as unknown as CustomNode).y!)
        .attr("x2", (d) => (d.target as unknown as CustomNode).x!)
        .attr("y2", (d) => (d.target as unknown as CustomNode).y!);

      personNodesWithImage.attr(
        "transform",
        (d) => `translate(${d.x!},${d.y!})`
      );

      personNodesWithoutImage.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      teamNodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      teamLabels.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
      personLabels.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    });

    // cleanup
    return () => {
      svg.selectAll("*").remove();
      simulation.stop();
    };
  }, [nodes, links]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        marginTop: "70px",
      }}
    >
      <span
        style={{
          boxShadow: "2px 2px 2px 2px grey",
          width: "90%",
        }}
      >
        <svg ref={svgRef} />
      </span>
    </div>
  );
};

export default NetworkPage;
