import HeaderAdmin from './HeaderAdmin';

function layout_admin({ children }) {
    return (
        <>
            <HeaderAdmin />
            <div>{children}</div>
        </>
    );
}

export default layout_admin;