import React from "react";
import userImg from "../../assets/images/pngs/avater.png";
import { useLocation, Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

const TopNav: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((path) => path);

    const formatBreadcrumb = (segment: string) =>
        segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-8">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 hidden md:flex p-5" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/dashboard">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {pathnames.map((segment, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <div key={routeTo} className="flex items-center">
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{formatBreadcrumb(segment)}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link to={routeTo}>{formatBreadcrumb(segment)}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </div>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="left__top__nav hidden lg:flex items-center">
                <div className="search__div relative me-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="absolute left-2 top-1 w-4.5 aspect-square"
                        width="24"
                        height="24"
                        color="#262B3A"
                        fill="none"
                    >
                        <path
                            d="M17.5 17.5L22 22"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input type="text" name="search" placeholder="Search" className="ps-8 py-2" />
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                >
                    <path
                        d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="line h-3.5 me-3"></div>
                <div className="user__image">
                    <img src={userImg} alt="user image" />
                </div>
            </div>
            <SidebarTrigger className="md:hidden p-5" />
        </header>
    );
};

export default TopNav;
