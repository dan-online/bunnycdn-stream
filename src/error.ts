import { HTTPError } from "ky";
import { lowerObject } from "./utils";

const errorTypes: { [key: number]: string } = {
	404: "NOT_FOUND",
	400: "BAD_REQUEST",
	401: "UNAUTHORIZED",
	403: "FORBIDDEN",
	500: "INTERNAL_SERVER_ERROR",
	502: "BAD_GATEWAY",
	503: "SERVICE_UNAVAILABLE",
	504: "GATEWAY_TIMEOUT",
};

export class BunnyCdnStreamError extends Error {
	public name: string;
	public code: number;

	public constructor(error: HTTPError | string, when?: string, code?: number) {
		super();
		this.name = "BunnyCdnStreamError";
		if (error instanceof HTTPError) {
			const response = error.response;
			this.code = response ? response.status : 0;
			this.message = `BunnyCdnStreamError: Operation "${when}" - ${
				response ? errorTypes[response.status] : "UNKNOWN_ERROR"
			} ${error.message}`;

			if (response) {
				response.text().then((text) => {
					try {
						const data = lowerObject<Record<string, unknown>>(JSON.parse(text));
						if ("error" in data) {
							this.message += `: ${data.error}`;
						}
						if ("message" in data) {
							this.message += `: ${data.message}`;
						}
					} catch {
						this.message += `: ${text}`;
					}
				});
			}
		} else {
			this.code = code || -1;
			this.message = `BunnyCdnStreamError: Unable to ${when}, ${error}`;
		}
	}
}
