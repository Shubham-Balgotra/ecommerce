import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../State/Product/Action";
import { store } from "../../State/store";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.product);
  const [page, setPage] = useState(1);
  const handleProductDelete = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(productId));
    }
  };

  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: "price-low",
      stock: "",
      pageNumber: page,
      pageSize: 10,
    };
    dispatch(findProducts(data));
  }, [dispatch, page,products.deleteProduct]);

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
          title="All Products"
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
              {products?.products?.content?.map((item, index) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                 
                  <TableCell align="left">{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    <Avatar src={item.imageUrl}></Avatar>
                  </TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">
                    {item.category?.name ? item.category.name : "null"}
                  </TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => handleProductDelete(item._id)}
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

        <Pagination color="primary" 
          count={products?.products?.totalPage || 1}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ my: 2, display: "flex", justifyContent: "center" }}
        />
      </Card>
    </div>
  );
};

export default ProductsTable;
