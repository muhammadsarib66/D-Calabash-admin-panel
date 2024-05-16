/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardBody,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import Header from "../../components/CardHeader";
const RiderStatusTab = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Online",
    value: "online",
  },
  {
    label: "Offline",
    value: "offline",
  },
];

const TableHeadings = ["Rider Name", "Phone ", "Email", "Status", "Action"];

const riders = [
  {
    name: "John Smith",
    phone: "0101234567",
    email: "john@example.com",
    status: "online",
    image: "rider1.jpg",
  },
  {
    name: "Jane Doe",
    phone: "0102345678",
    email: "jane@example.com",
    status: "offline",
    image: "rider2.jpg",
  },
  {
    name: "Michael Johnson",
    phone: "0103456789",
    email: "michael@example.com",
    status: "online",
    image: "rider3.jpg",
  },
  {
    name: "Emily Brown",
    phone: "0104567890",
    email: "emily@example.com",
    status: "offline",
    image: "rider4.jpg",
  },
  {
    name: "William Wilson",
    phone: "0105678901",
    email: "william@example.com",
    status: "online",
    image: "rider5.jpg",
  },
  {
    name: "Olivia Taylor",
    phone: "0106789012",
    email: "olivia@example.com",
    status: "offline",
    image: "rider6.jpg",
  },
  {
    name: "James Martinez",
    phone: "0107890123",
    email: "james@example.com",
    status: "online",
    image: "rider7.jpg",
  },
  {
    name: "Sophia Anderson",
    phone: "0108901234",
    email: "sophia@example.com",
    status: "offline",
    image: "rider8.jpg",
  },
  {
    name: "Alexander Thomas",
    phone: "0109012345",
    email: "alexander@example.com",
    status: "online",
    image: "rider9.jpg",
  },
  {
    name: "Isabella Garcia",
    phone: "0100123456",
    email: "isabella@example.com",
    status: "offline",
    image: "rider10.jpg",
  },
];


const index = () => {
  const [filterData, setFilterData] = useState<any>([]);

  const [statusTab, setStatusTab] = useState<any>("all");
  const [search, setSearch] = useState<any>("");

  useEffect(() => {
    const filteredData = riders.filter((data: any) => {
      if (statusTab === "all") {
        return true;
      } else {
        return data.status.toLowerCase() === statusTab;
      }
    });
    setFilterData(filteredData);

    if (search.length > 0) {
      const filteredData = riders.filter((data: any) => {
        return data.name.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    }
  }, [statusTab, search]);
  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Header
        heading={"Riders List"}
        headingDetail="See information about  Riders"
        statusTabs={RiderStatusTab}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
        BtnTitle="Add Rider"
      />

      <CardBody
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className=" h-[70vh]  overflow-scroll px-0"
      >
        <table className="mt-4 w-full min-w-max table-auto  text-left">
          <thead>
            <tr className="">
              {TableHeadings?.map((head: any) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {filterData?.map(
              ({ name, phone, email, status }: any, index: any) => {
                const isLast = index === filterData?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <>
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phone}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={status}
                            color={status === "online" ? "green" : "red"}
                          />
                        </div>
                      </td>
                     
                      <td className={classes}>
                        <IconButton
                          variant="text"
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          <DeleteIcon className=" text-red-500 h-4 w-4" />
                        </IconButton>
                      </td>
                    </tr>
                  </>
                );
              }
            )}
          </tbody>
        </table>
       
      </CardBody>
    </Card>
  );
};

export default index;
