import DataTable from "@/components/DataTable";
import { Container, Box } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box>
        <DataTable />
      </Box>
    </Container>
  );
}
