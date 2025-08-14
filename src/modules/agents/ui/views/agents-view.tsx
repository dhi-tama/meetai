"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { columns } from "../components/colomns";
import { DataTable } from "../components/data-table";
import { EmptyState } from "@/components/empty-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns} />
      {data.length === 0 && (
        <EmptyState
          title="Your Personal Mentor Awaits"
          description="Build an AI tutor who teaches at your pace, explains clearly, and never runs out of patience."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Deploying Your Agent"
      description="Collecting intelligence from the field."
    />
  );
};
export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Signal Lost"
      description="Something went off-script. Adjusting the plan."
    />
  );
};
