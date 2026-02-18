import ProductList from "@/components/ProductList";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string,search:string,sort:string }>;
}) => {
  const category = (await searchParams).category;
  const sort = (await searchParams).sort;
  const search = (await searchParams).search;
  return (
    <div className="">
      <ProductList category={category} search={search} sort={sort} params="products"/>
    </div>
  );
};

export default ProductsPage;
