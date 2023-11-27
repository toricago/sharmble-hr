"use client"
import React, { FunctionComponent } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { UserButton } from "@clerk/clerk-react"
import { BarChart2, HomeIcon } from "lucide-react"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Commitment",
    href: "/kpi",
    description: "Your personal KPIs, and the KPIs of your team.",
  },
  {
    title: "Evaluation",
    href: "/kpi/review",
    description: "Review your KPIs, your co-workers KPIs every half year.",
  },
]

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="h-[70px] w-full bg-white bg-opacity-90 fixed z-50 border-b-[1px] border-slate-200">
        <div className="container h-full flex items-center">
          <div className="flex items-center">
            <div className="sm:flex sm:w-[40px] hidden">
              <Image
                src="/images/LOGO361px.png"
                alt="sharmble logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <div className="flex sm:ml-12">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <HomeIcon className="mr-2" size={14} />
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <BarChart2 className="mr-2" size={14} />
                      KPIs
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
      <div className="pt-[70px] min-h-[100vh] container">{children}</div>
    </div>
  )
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"

export default Layout
