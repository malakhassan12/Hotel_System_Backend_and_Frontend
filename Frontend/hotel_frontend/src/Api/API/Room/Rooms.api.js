import roomClient from "../../Client/User/Room.client";

export const getRoomsByType = async (type) => {
    try{
  const res = await roomClient.get("/type", {
    params: { type },
  });
  return res.data;
}catch(err){
    return err;
}
};

export const getRoomsByFeature = async (feature) => {
    try{
  const res = await roomClient.get("/feature", {
    params: { feature },
  });
  return res.data;
}catch(err){
    return err;
}
};