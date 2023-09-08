import {Result, Button} from "antd";


function Success({backToHome, title, subTitle}) {
    return (
        <Result
        status="success"
        title={title}
        subTitle={subTitle}
        extra={[
            <Button type="default" key="Back to Main Page" onClick={backToHome}>
                Back to Main Page
            </Button>
        ]}
        />
    );
    }

export default Success;
