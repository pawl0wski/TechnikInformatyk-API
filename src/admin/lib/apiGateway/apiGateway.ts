import { useAuthStore } from "../../stores/authStore";
import axios, { AxiosResponse } from "axios";
import ExamRequest from "../../../interfaces/examRequest";

export default class ApiGateway {
    private readonly _authStore: ReturnType<typeof useAuthStore>;

    static withDefaultApiStore(): ApiGateway {
        return new ApiGateway(useAuthStore());
    }

    constructor(authStore: ReturnType<typeof useAuthStore>) {
        this._authStore = authStore;
    }

    // A method that receives axios to know at which http status codes to throw an exception
    private _validateAxiosStatus(status: number) {
        return [200, 404, 401].includes(status);
    }

    private get _httpHeaders() {
        return this._authStore.httpHeaders;
    }

    private get _defaultAxiosOptions() {
        return {
            headers: this._httpHeaders,
            validateStatus: this._validateAxiosStatus,
        };
    }

    async getApiKeyInfo(apiKey: string): Promise<AxiosResponse> {
        return await axios.get(`/key/${apiKey}`, this._defaultAxiosOptions);
    }

    async getExams(): Promise<AxiosResponse> {
        return await axios.get(`/exam/`, this._defaultAxiosOptions);
    }

    async getQuestions(): Promise<AxiosResponse> {
        return await axios.get(`/question/`, this._defaultAxiosOptions);
    }

    async deleteExam(examUuid: string): Promise<AxiosResponse> {
        return await axios.delete(
            `/exam/${examUuid}`,
            this._defaultAxiosOptions
        );
    }

    async updateExam(
        examUuid: string,
        body: ExamRequest
    ): Promise<AxiosResponse> {
        return await axios.put(
            `/exam/${examUuid}`,
            body,
            this._defaultAxiosOptions
        );
    }

    async createExam(
        examUuid: string,
        body: ExamRequest
    ): Promise<AxiosResponse> {
        return await axios.post(
            `/exam/${examUuid}`,
            body,
            this._defaultAxiosOptions
        );
    }

    async getQuestionImage(questionUuid: string): Promise<AxiosResponse> {
        return await axios.get(
            `/question/${questionUuid}/image/`,
            this._defaultAxiosOptions
        );
    }
}
