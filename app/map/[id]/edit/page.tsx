const Page = ({ params }: { params: { id: string } }) => {

    const id = params.id;

    return (
        <div>{"Edit Map " + id}</div>
    )
}
export default Page