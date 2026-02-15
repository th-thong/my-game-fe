import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"


export function GameData() {
  return (
    <Card className="w-full  max-w-50">

      <CardHeader>
        <CardTitle>Account Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>

            <TableRow>
              <TableCell>UID</TableCell>
              <TableCell>9000</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Login Day</TableCell>
              <TableCell>103</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>Waveplate</TableCell>
              <TableCell>240</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>Login Day</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
            

          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Update
        </Button>
      </CardFooter>

    </Card>
  );
}
