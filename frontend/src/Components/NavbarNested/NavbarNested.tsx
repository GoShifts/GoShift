import { Group, Code, ScrollArea, rem, Text } from "@mantine/core";
import { IconNotes, IconCalendarStats, IconGauge } from "@tabler/icons-react";
import { UserButton } from "../UserButton/UserButton";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";
import { Logo } from "./Logo";
import classes from "./NavbarNested.module.css";

const mockdata = [
  { label: "Dashboard", icon: IconGauge },
  {
    label: "Shift",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Add Shift", link: "/addShift" },
      { label: "View Shifts", link: "/allShifts" },
      // { label: "Outlook", link: "/" },
      // { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Staff",
    icon: IconCalendarStats,
    links: [
      { label: "Add Staff", link: "/addStaff" },
      { label: "All Staff", link: "/allStaff" },
      // { label: "Releases schedule", link: "/" },
    ],
  },
  {
    label: "Building",
    icon: IconCalendarStats,
    links: [
      { label: "Add Building", link: "/addStaff" },
      { label: "All Buildings", link: "/allStaff" },
      // { label: "Releases schedule", link: "/" },
    ],
  },
  // { label: "Analytics", icon: IconPresentationAnalytics },
  // { label: "Contracts", icon: IconFileAnalytics },
  // { label: "Settings", icon: IconAdjustments },
  // {
  //   label: "Security",
  //   icon: IconLock,
  //   links: [
  //     { label: "Enable 2FA", link: "/" },
  //     { label: "Change password", link: "/" },
  //     { label: "Recovery codes", link: "/" },
  //   ],
  // },
];

export function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          {/* <Logo style={{ width: rem(120) }} /> */}
          <h1 style={{ width: rem(120) }}>GoShift</h1>
          {/* <Code fw={700}>v3.1.2</Code> */}
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>{/* <UserButton /> */}</div>
    </nav>
  );
}
