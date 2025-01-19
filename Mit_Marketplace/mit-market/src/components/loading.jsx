import { RotatingTriangles } from "react-loader-spinner";

const Loading = () => {
    return (
        <div style={styles.container}>
            <RotatingTriangles
                visible={true}
                height="140"
                width="140"
                color="#4fa94d"
                ariaLabel="rotating-triangles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        // backgroundColor: "rgba(255, 255, 255, 0.9)",
        backgroundColor: "#020020",
        zIndex: 9999,
    },
};

export default Loading;
