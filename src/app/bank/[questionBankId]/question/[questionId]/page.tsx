import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { Flex, Menu } from "antd";
import Title from "antd/es/typography/Title";
import Sider from "antd/lib/layout/Sider";
import message from "antd/lib/message";
import QuestionCard from "@/components/QuestionCard";
interface Props {
  questionBankId: number;
  questionId: number;
}
/**
 * 题库题目详情页
 */
export default async function BankQuestionPage({ params}) {
  let bank = undefined;
  const { questionBankId,questionId}=params;
  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = res.data;
  } catch (e) {
    console.log("获取题库详情失败" + e.message);
  }
  if (!bank) {
    return <div>题库不存在</div>;
  }

  let question = undefined;

  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e) {
    console.log("获取题目详情失" + e.message);
  }
  if (!question) {
    return <div>题目不存在</div>;
  }

  const questionMenuItemList=(bank.questionPage?.records || []).map(item=>({
    key:item.id,
    label:item.title,
  }));
  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{padding: "0 20px"}}>
            {bank.title}
          </Title>
          <Menu items={questionMenuItemList}/>
        </Sider>
        <Content>
            <QuestionCard question={question} />
        </Content>
      </Flex>
    </div>
  );
}
