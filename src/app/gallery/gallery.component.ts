import {Component, OnInit} from '@angular/core';
import {BusinessAccount} from "../models/business-account.model";
import {DialogService} from "../services/dialog.service";
import {NotificationService} from "../services/notification.service";
import {BusinessService} from "../services/business.service";
import {DropzoneConfigInterface} from "angular2-dropzone-wrapper";
import {AppService} from "../services/app.service";
import {AuthService} from "../services/auth.service";
import {GalleryImage} from "../models/gallery-image.model";

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

	selectedAccount: BusinessAccount = new BusinessAccount();
	businessAccounts: BusinessAccount[] = [];

	loading: boolean = false;

	uploadEvent: any;
	uploadConfig: DropzoneConfigInterface = {
		server: '',
		maxFilesize: 50,
		acceptedFiles: 'image/*',
		headers: {"Authorization": "bearer " + this.appService.token},
		paramName: 'image',
		autoReset: 1000
	};

	images: GalleryImage[] = [];


	constructor(private appService: AppService, private dialogService: DialogService,
							private auth: AuthService,
							private notification: NotificationService,
							private businessService: BusinessService) {


		let currentBusinessAccount = this.appService.currentBusinessAccount;
		if (currentBusinessAccount) {
			this.selectedAccount = currentBusinessAccount;
			this.changeUploadConfig();
			this.getGallery();
		}

		this.appService.currentBusinessAccount$.subscribe(account => {
			if (account) {
				this.selectedAccount = account;
				this.changeUploadConfig();

				this.getGallery();
			}
		});
	}

	ngOnInit() {


	}

	changeUploadConfig() {

		this.uploadConfig.headers = {"Authorization": "bearer " + this.auth.getToken()};
		this.uploadConfig.server = this.appService.serverURL + '/businesses/' + this.selectedAccount.id + '/gallery-images';
	}

	getGallery() {

		this.businessService.getGallery(this.selectedAccount.id).subscribe(res => {

			this.images = res;

		}, err => {
			console.log(err);
		})

	}

	onUploadSuccess(event) {
		this.uploadEvent = event;

		console.log('uploaded: ', event);

		if (event && typeof event[1] !== "undefined" && typeof event[1].data !== "undefined") {
			this.images.push(event[1].data);
		}

	}

	onUploadError(event) {
		console.log('Upload error', event);
	}

	deleteImage(image: GalleryImage) {


		this.businessService.deleteGalleryImage(image).subscribe(res => {


			let imageIndex = this.findIndexByImage(image);
			if (imageIndex !== null) {
				this.images.splice(imageIndex, 1);
			}
		}, err => {
			console.log(err);
			this.notification.show("an error deleting the image", 'error');
		});
	}

	findIndexByImage(image: GalleryImage): number {

		for (let i = 0; i < this.images.length; i++) {

			if (this.images[i].id == image.id) {
				return i;
			}

		}
		return null;
	}

}
