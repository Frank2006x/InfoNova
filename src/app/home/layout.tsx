


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <nav className="sticky top-0 left-0 w-full h-[8vh] bg-sidebar  border-b-2   border-sidebar-border ">
        <div className="text-white p-4">
          <h1 className="font-serif">My Website</h1>
        </div>
    </nav>
    <div >
      {children}
    </div>
    </>
  );
};

export default Layout;
