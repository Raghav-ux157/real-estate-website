import { KanbanBoard } from "@/components/admin/KanbanBoard";

export default function LeadsPipelinePage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold">Leads Pipeline</h1>
        <p className="text-muted-foreground mt-1">Manage and track your leads through the sales funnel.</p>
      </div>
      
      {/* Kanban Board Component */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <KanbanBoard />
      </div>
    </div>
  );
}
