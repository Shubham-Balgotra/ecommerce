import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../State/Admin/Order/Action';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const adminOrders= useSelector(store=>store.adminOrder)

  useEffect(()=>{
    dispatch(getOrders())
  },[])
  console.log("Admin Orders---",adminOrders)
  return (
    <div>
      <Card sx={{ position: "relative" }}>
              <CardHeader
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "white", // Ensure the header has a background
                }}
                title="All Orders"
              ></CardHeader>
              <TableContainer
                sx={{ maxHeight: "450px", overflowY: "auto" }}
                component={Paper}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead
                    sx={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "white",
                      zIndex: 2,
                    }}
                  >
                    <TableRow>
                      <TableCell align="left">Sr.No.</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="left">Category</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminOrders?.orders?.map((item, index) => (
                      <TableRow
                        key={item._id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                       
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell component="th" scope="row" align='left'>
                        <AvatarGroup>
                            {item.orderItems.map((orderItem)=><Avatar src={orderItem?.product?.imageUrl}></Avatar>)}
                          </AvatarGroup>
                          
                        </TableCell>
                        <TableCell align="left"> {item.orderItems.map((orderItem)=><p>{orderItem?.product?.title}</p>)}</TableCell>
                        <TableCell align="left">
                          {item.category?.name ? item.category.name : "null"}
                        </TableCell>
                        <TableCell align="left">{item.price}</TableCell>
                        <TableCell align="left">{item.quantity}</TableCell>
                        <TableCell align="left">
                          <Button
                            
                            sx={{ variant: "outline", color: "red" }}
                          >
                            DELETE
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
      
              {/*<Pagination color="primary" 
                count={products?.products?.totalPage || 1}
                page={page}
                onChange={(event, value) => setPage(value)}
                sx={{ my: 2, display: "flex", justifyContent: "center" }}
              />*/}
            </Card>
    </div>
  )
}

export default OrdersTable 