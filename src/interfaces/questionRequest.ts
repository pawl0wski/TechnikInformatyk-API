export default interface QuestionRequest {
    content: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: number;
    examUuids: string[];
}
