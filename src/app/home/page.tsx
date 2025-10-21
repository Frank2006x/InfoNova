import RightPanel from "@/components/RightPanel";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const HomePage = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[92vh] max-w-md rounded-lg border md:min-w-screen"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <RightPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default HomePage;
