export default interface QuestionRequest {
    uuid: string;
    content: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: number;
    examUuids: string[];
}
