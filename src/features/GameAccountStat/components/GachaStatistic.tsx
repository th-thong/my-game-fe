import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"


export function GachaStatistic() {
  return (
    <Card className="w-full border-none">

      <CardHeader>
        <CardTitle>Gacha Statistic</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>

            <TableRow>
              <TableCell>50/50 win</TableCell>
              <TableCell>60%</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Total pull</TableCell>
              <TableCell>1800</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>Total Asttre</TableCell>
              <TableCell>240</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>???</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
            

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
