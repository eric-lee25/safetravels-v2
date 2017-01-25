import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {AutocompleteData} from "../../models/autocompleteData.model";
import {Subject} from "rxjs";


@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnChanges {

	_value: any;
	_dropdown: AutocompleteData[] = [];
	_deboundTime: number;
	_required: boolean;
	_placeholder: string = "";
	_open: boolean = false;

	@Input() set value(defaultValue: any) {

		this._value = defaultValue;
	}

	@Input() set dropdown(data: AutocompleteData[]) {
		this._dropdown = data;
		if (data.length) {
			this._open = true;
		}
	}

	@Input() set debounceTime(time: number) {

		this._deboundTime = time;
	}

	@Input() set placeholder(text: string) {

		this._placeholder = text;
	}

	@Input() set required(required: boolean) {
		this._required = required;
	}

	@Output() onKeyup: EventEmitter<string> = new EventEmitter<string>();
	@Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

	searchTerm: Subject<string> = new Subject<string>();

	constructor() {

		let debounceTimeValue: number = this._deboundTime ? this._deboundTime : 300;

		this.searchTerm.distinctUntilChanged().debounceTime(debounceTimeValue).subscribe(term => {
			this.onKeyup.emit(term);
		});

	}

	onInputKeyUp(text: string) {
		this.searchTerm.next(text);
	}

	select(item: AutocompleteData) {
		this.onSelect.emit(item);
		this._open = false;
		this._dropdown = [];
		this._value = item.title;
	}

	ngOnInit() {

		this._open = false;
		this._required = true;

	}

	ngOnChanges() {
		if (this._dropdown.length) {
			this._open = true;
		}
	}

}
