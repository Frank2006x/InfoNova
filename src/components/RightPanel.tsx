import { BookOpenCheck, Bug, Wrench } from "lucide-react";

const RightPanel: React.FC = () => {
  return (
    <div className="flex h-full flex-col p-6">
      <section className="flex gap-3 w-full justify-between" id="agents">
        <div className="rounded-full w-15 h-15 bg-muted flex items-center justify-center mb-4">
          <BookOpenCheck />
          
        </div>
        <div className="rounded-full w-15 h-15 bg-muted flex items-center justify-center mb-4">
          <Bug />
        </div>
        <div className="rounded-full w-15 h-15 bg-muted flex items-center justify-center mb-4">
          <Wrench />
        </div>
      </section>
    </div>
  );
};

export default RightPanel;
