import { useEffect, useState } from "react";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchUserFriendListIds,
  fetchUserFriendListData,
} from "../../utils/helperFunctions";
const People = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [friendsListData, setFriendsListData] = useState([]);
  const initilizeFriendList = async () => {
    setFriendsListData(
      await fetchUserFriendListData(await fetchUserFriendListIds(uuid))
    );
  };

  useEffect(() => {
    initilizeFriendList();
  }, []);

  return (
    <div className="h-full w-full bg-inside-circle">
      <IoChevronBackCircleSharp
        size="70%"
        className="w-10"
        onClick={() => navigate("/home")}
      />
      {friendsListData && friendsListData.length > 0 && <span>Prieteni</span>}
    </div>
  );
};
export default People;
