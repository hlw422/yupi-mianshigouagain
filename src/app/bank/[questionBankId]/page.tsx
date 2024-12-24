import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";
import { Avatar, Card, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { message } from "antd/lib";
import { AxiosResponse } from "axios";

export default async function BankPage({params}) {
    console.log("params:",params);
    const {questionBankId} = params;
    let bank=undefined;
    try{
        const res=await getQuestionBankVoByIdUsingGet({
            id:questionBankId,
            needQueryQuestionList:true,
            pageSize:200
        })
        bank=res.data;
        console.log("bank:",bank);
    }
    catch(e){
        message.error("获取题库失败,"+e.message);
    }
    if(!bank){
        return <div>获取题库列表失败，请刷新重试</div>;
    }
    return(
        <div id="bankPage" className="max-width-content">
            <Card>
                <Meta
                avatar={<Avatar src={bank.picture} size={72}/>}
                title={
                    <Title level={3} style={{marginBottom:0}}>
                        {bank.title}
                    </Title>
                }
                description={
                    <Paragraph
                    type="secondary">
                        {bank.description}
                    </Paragraph>
                }
                >

                </Meta>
            </Card>
            <QuestionList QuestionList={bank.questionPage.records??[]} cardTitle={`题目列表（共${
                bank.questionPage?.total||0}题)` } questionBankId={questionBankId}></QuestionList>
        </div>
    )
}