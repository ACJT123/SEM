import {Result, Button} from "antd";

function Success() {
    return (
        <Result
        status="success"
        title="Successfully Submitted Application"
        subTitle="Your application is now pending approval"
        extra={[
            <Button type="default" key="Back to Main Page">
                Back to Main Page
            </Button>
        ]}
        />
    );
    }

export default Success;
