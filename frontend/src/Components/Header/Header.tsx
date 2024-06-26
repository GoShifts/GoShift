import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { Link, Navigate } from "react-router-dom";

interface Props {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Header({ setIsAuth }: Props) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  function handleLaogout() {
    setIsAuth(false);
    <Navigate to="/login" />;
  }

  return (
    <Box pb={30}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to="/" className={classes.link}>
            <h1>GoShift</h1>
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/shifts" className={classes.link}>
              Shifts
            </Link>
            <Link to="/rooms" className={classes.link}>
              Rooms
            </Link>
            <Link to="/staff" className={classes.link}>
              Staff
            </Link>
            <Link to="/building" className={classes.link}>
              Building
            </Link>
          </Group>

          <Group visibleFrom="sm" style={{ padding: "20px" }}>
            <Button radius="xl" onClick={handleLaogout}>
              Log Out
            </Button>
            {/* <Button>Sign up</Button> */}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      {/* Mobile View */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Link to="/shifts" className={classes.link}>
            Shifts
          </Link>
          <Link to="/rooms" className={classes.link}>
            Rooms
          </Link>
          <Link to="/staff" className={classes.link}>
            Staff
          </Link>
          <Link to="/building" className={classes.link}>
            Building
          </Link>
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button radius="xl" onClick={handleLaogout}>
              Log Out
            </Button>
            {/* <Button variant="default">Log in</Button> */}
            {/* <Button>Sign up</Button> */}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

// import { Menu, Group, Center, Burger, Container } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { IconChevronDown } from "@tabler/icons-react";
// // import { MantineLogo } from "@mantinex/mantine-logo";
// import classes from "./Header.module.css";

// const links = [
//   { link: "/", label: "Home" },
//   { link: "/shifts", label: "Shifts" },
//   { link: "/rooms", label: "Rooms" },
//   { link: "/staff", label: "Staff" },
//   { link: "/building", label: "Building" },
//   {
//     link: "#2",
//     label: "About",
//     links: [
//       { link: "/", label: "Home" },
//       { link: "/", label: "About" },
//     ],
//   },
// ];

// export function Header() {
//   const [opened, { toggle }] = useDisclosure(false);

//   const items = links.map((link) => {
//     const menuItems = link.links?.map((item) => (
//       <Menu.Item key={item.link}>{item.label}</Menu.Item>
//     ));

//     if (menuItems) {
//       return (
//         <Menu
//           key={link.label}
//           trigger="hover"
//           transitionProps={{ exitDuration: 0 }}
//           withinPortal
//         >
//           <Menu.Target>
//             <a
//               href={link.link}
//               className={classes.link}
//               // onClick={(event) => event.preventDefault()}
//             >
//               <Center>
//                 <span className={classes.linkLabel}>{link.label}</span>
//                 <IconChevronDown size="0.9rem" stroke={1.5} />
//               </Center>
//             </a>
//           </Menu.Target>
//           <Menu.Dropdown>{menuItems}</Menu.Dropdown>
//         </Menu>
//       );
//     }

//     return (
//       <a
//         key={link.label}
//         href={link.link}
//         className={classes.link}
//         // onClick={(event) => event.preventDefault()}
//       >
//         {link.label}
//       </a>
//     );
//   });

//   return (
//     <header className={classes.header}>
//       <Container size="md">
//         <div className={classes.inner}>
//           <h1>GoShift</h1>
//           <Group gap={20} visibleFrom="sm">
//             {items}
//           </Group>
//           <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
//         </div>
//       </Container>
//     </header>
//   );
// }
