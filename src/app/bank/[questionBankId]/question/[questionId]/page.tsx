import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import Sider from "antd/lib/layout/Sider";
import message from "antd/lib/message";
interface Props {
  questionBankId: number;
  questionId: number;
}
/**
 * 题库题目详情页
 */
export default async function BankQuestionPage({ questionBankId,questionId }:Props) {
  let bank = undefined;
  console.log(questionBankId,questionId)
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
  return (
    <div id="bankQuestionPage">
      <Flex>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{padding: "0 20px"}}></Title>
        </Sider>
      </Flex>
    </div>
  );
}
