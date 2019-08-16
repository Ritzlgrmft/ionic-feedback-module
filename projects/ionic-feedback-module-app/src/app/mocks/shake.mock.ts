import { Shake } from "@ionic-native/shake/ngx";
import { Observable } from "rxjs";

export class ShakeMock extends Shake {
	startWatch(sensitivity?: number): Observable<any> {
		return Observable.create((observer) => {
			window.addEventListener("orientationchange", () => {
				observer.next();
			});
		});
	}
}
