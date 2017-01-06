import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-counter',
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, AfterViewInit {
	constructor() {

		this.countoChange.subscribe(current => {

			this.num = parseInt(current);

		})

	}


	@Output() countoChange = new EventEmitter();
	private _timer;
	private _duration: number;
	private _countTo: number;
	private _countFrom: number;
	private _step: number;
	private num: number;
	private _suffix: any;
	private _prefix: any;

	@Input()
	set suffix(suffix) {

		this._suffix = suffix;

	}

	@Input()
	set prefix(prefix) {
		this._prefix = prefix;
	}


	@Input()
	set duration(duration) {
		this._duration = parseFloat(duration);
		this.run();
	}

	@Input()
	set countTo(countTo) {
		this._countTo = parseFloat(countTo);
		this.run();
	}

	@Input()
	set countFrom(countFrom) {
		this._countFrom = parseFloat(countFrom);
		this.run();
	}

	@Input()
	set step(step) {
		this._step = parseFloat(step);
		this.run();
	}

	run() {
		let that = this;
		clearInterval(that._timer);

		if (isNaN(that._duration)) {
			return false;
		}

		if (isNaN(that._step)) {
			return false;
		}

		if (isNaN(that._countFrom)) {
			return false;
		}

		if (isNaN(that._countTo)) {
			return false;
		}

		if (that._step <= 0) {
			console.info('Step must be greater than 0.');
			return false;
		}

		if (that._duration <= 0) {
			console.info('Duration must be greater than 0.');
			return false;
		}

		if (that._step > that._duration * 1000) {
			console.info('Step must be equal or smaller than duration.');
			return false;
		}

		let intermediate = that._countFrom;
		let increment = Math.abs(that._countTo - that._countFrom) / ((that._duration * 1000) / that._step);

		that.countoChange.emit(intermediate);

		that._timer = setInterval(function () {
			if (that._countTo < that._countFrom) {
				if (intermediate <= that._countTo) {
					clearInterval(that._timer);
					that.countoChange.emit(that._countTo);
				} else {
					that.countoChange.emit(intermediate);
					intermediate -= increment;
				}
			} else {
				if (intermediate >= that._countTo) {
					clearInterval(that._timer);
					that.countoChange.emit(that._countTo);
				} else {
					that.countoChange.emit(intermediate);
					intermediate += increment;
				}
			}
		}, that._step);
	}


	ngOnInit() {

	}

	ngAfterViewInit() {

	}


}
