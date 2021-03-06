export default interface QuestionResponse {
    uuid: string;
    content: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: number;
    haveImage: boolean;
    examUuids: string[];
}
