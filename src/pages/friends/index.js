import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllFriends } from "../../redux/slices/friend";
import FriendsTableToolbar from "./FriendsTableToolbar";
import TablerowFriends from "./TablerowFriends";

export default function Friends() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friend);
  const [tableData, setTableData] = React.useState(friends);

  React.useEffect(() => {
    dispatch(getAllFriends());
  }, [dispatch]);

  React.useEffect(() => {
    if (friends?.length) {
      setTableData(friends);
    }
  }, [friends]);

  return (
    <>
      <div className="flex h-10 items-center">
        <h1 className="text-[22px] font-bold">Friends List</h1>
        <h5 className="text-[15px] font-normal ml-5">
          {" "}
          <span className="text-[#00000082]">Friends</span> / Friends List{" "}
        </h5>
      </div>
      <div className="shadow-lg bg-white rounded-lg mt-8">
        <FriendsTableToolbar />
        <div className="flex flex-col">
          <div className="overflow-x-auto ">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      INDEX
                    </th>
                    <th scope="col" className="px-6 py-4">
                      NAME
                    </th>
                    <th scope="col" className="px-6 py-4">
                      PHONE
                    </th>
                    <th scope="col" className="px-6 py-4">
                      EMAIL
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Add Friends
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <TablerowFriends key={row.id} row={row} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
