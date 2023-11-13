import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDeleteProduct, useGetProducts } from "../../apiCalls/productApiCalls";
import Loader from '../../components/Loader'

export default function ProductList() {
  const {isLoading:isProductsLoading, data:products, isError:isProductsError, error:productsError} = useGetProducts()
  const {mutate:deleteProductMutate, isLoading:isDeleteProductLoading, isError:isDeleteProductError, error:deleteProductError} = useDeleteProduct();

  if (isProductsLoading) {
    return <Loader/>
  }
  
  if (isProductsError) {
    return <h2>{productsError.message}</h2>
  }

  if (isDeleteProductLoading) {
    return <Loader/>
  }
  
  if (isDeleteProductError) {
    return <h2>{deleteProductError.message}</h2>
  }
  
    const handleDelete = (productId) => {
      deleteProductMutate(productId)
    };
  console.log(products?.data)

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.images[0].url} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
        <div style={{ padding: "10px 0px" }}>
        <Link to="/newProduct">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
       rows={products?.data.products}
       getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
