import { auth, type User } from "@clerk/nextjs/server";
import {  columns } from "./columns";
import { DataTable } from "./data-table";
import { number } from "zod";

const getData = async (): Promise<{data:User[]; totalCount:number}> => {
  const {getToken}= await auth()
  const token=await getToken()
  try{
    const res= await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`,
      {
        headers:{
          Authentication:`Berear ${token}`
        }
      }
    )
    const data=await res.json()
    return data
  }catch(error){
    console.log(error)
    return{data:[],totalCount:0}
  }
};

const UsersPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UsersPage;
