import {Result, Button} from "antd";


function Fail({backToHome, title, subTitle}) {
    return (
        <Result
        status="warning"
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

export default Fail;
