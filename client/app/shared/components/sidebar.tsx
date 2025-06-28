import { AppSidebar } from '~/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { Separator } from '~/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

type SidebarProps = {
  children: React.ReactNode;
  breadcrumb: {
    title: string | React.ReactNode;
    parents: {
      title: string;
      url: string;
    }[];
  };
};

export default function Sidebar(props: SidebarProps) {
  const { children, breadcrumb } = props;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
                {breadcrumb.parents.map((parent, index) => (
                  <>
                    <BreadcrumbItem key={index} className="hidden md:block">
                      <BreadcrumbLink href={parent.url}>{parent.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                ))}
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="main-content">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="col-span-2 flex flex-col gap-4">{children}</div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
