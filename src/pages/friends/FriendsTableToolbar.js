import { Box, Button, Link, Stack } from "@mui/material";

export default function FriendsTableToolbar() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{ py: 2.5, px: 3 }}
      className="flex justify-between"
    >
      <Box>
        <Link href="/createfriends">
          <Button variant="contained">Add Friends</Button>
        </Link>
      </Box>
    </Stack>
  );
}
