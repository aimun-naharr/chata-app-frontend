import React from "react";
import { Discuss } from "react-loader-spinner";

const LoadingComponent = () => {
	return (
		<div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
			<div>
				<Discuss visible={true} height="80" width="80" ariaLabel="comment-loading" wrapperStyle={{}} wrapperClass="comment-wrapper" color="black" backgroundColor="#ff727d" />
				<p>Please wait....</p>
			</div>
		</div>
	);
};

export default LoadingComponent;
