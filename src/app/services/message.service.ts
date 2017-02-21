import {Injectable} from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {MessageTemplate} from "./message-template.model";

@Injectable()
export class MessageService {

	constructor(private appService: AppService) {
	}

	getMessageTemplates(businessId: number): Observable<MessageTemplate[]> {

		return this.appService.get('/businesses/' + businessId + '/templates').map(res => res.json().data).catch(err => Observable.throw(err));
	}

}
