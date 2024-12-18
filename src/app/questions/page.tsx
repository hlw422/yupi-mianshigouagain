"use server";
import Title from "antd/es/typography/Title";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";
import "./index.css";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionList from "@/components/QuestionList";
import QuestionTable from "@/components/QuestionTable";


/**
 * 题库列表页面
 * @constructor
 * searchParams 接收页面参数
 */
export default async function QuestionsPage({ searchParams }) {
  //获取url的查询参数
  const { q: searchText } = searchParams;

  let questionList = [];
  // 题库数量不多，直接全量获取
  const pageSize = 12;
  let total=0;

  try {
    const questionRes = await listQuestionVoByPageUsingPost({
      //作为查询条件
      title: searchText,
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = questionRes.data.records ?? [];
    total=questionRes.data.total??0;
  } catch (e) {
    console.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable defaultQuestionList={questionList} defaultTotal={total} defaultSearchParams={{title:searchText}} />
    </div>
  );
}
