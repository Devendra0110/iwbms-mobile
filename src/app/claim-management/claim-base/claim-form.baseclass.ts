import * as _ from 'lodash';
import * as moment from 'moment';
import * as sanscript from '@sanskrit-coders/sanscript';
import * as uuidv4 from 'uuid/v4';

import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { ClaimService } from 'src/app/services/claim.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { HttpService } from 'src/app/services/http.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { TransliterationService } from 'src/app/services/transliteration.service';

export abstract class ClaimBasePage {

    public formGroup: FormGroup;
    public fileOptions: Object;
    public files: Object;
    protected getFile: boolean;
    public JWTToken: any;
    protected todaysDate: any;
    public lastYear: any;
    public genderPersonalArray: any[];
    public getRelationArray: any[];
    public getEducationArray: any[];
    public getStandardArray: any[];
    public open = true;
    public sortedArray = [];
    public userInfo: any;
    public schemeDetails: any;
    public dateReg: string;
    public wrongYearOfPassing: number;

    @Input() user: any;
    @Input() filledFormData: any;
    @Input() familyDetailsArray: any;
    @Input() editFormFlagObservable: Observable<any>;
    @Input() applicantRegistrationDetails: any;
    @Input() selectedSchemeName:string;

    constructor(
        protected transliterate: TransliterationService,
        protected httpService: HttpService,
        protected claimHttpService: ClaimService,
        protected router: Router,
        protected storage: Storage,
        protected toast: Toast,
        protected dialogs: Dialogs,
    ) {
        this.todaysDate = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate()
        };

        this.lastYear = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate()
        };
        // re-route to homepage if not logged-in
        this.storage.get('token').then((val) => {
            this.JWTToken = val;
        });
        this.wrongYearOfPassing = 0;
    }


    get benefitType() { return this.formGroup.get('benefitType'); }
    get benefitAmount() { return this.formGroup.get('benefitAmount'); }

    async getSchemeDetails() {
        return new Promise((resolve, reject) => {
            if (this.user) {
                this.claimHttpService.getSchemeDetailsBySchemeNumber(this.user.schemeID, this.JWTToken).subscribe((schemeDetails: any) => {
                    this.schemeDetails = schemeDetails[0];
                    resolve(schemeDetails[0]);
                }, (error: any) => {
                    reject(error);
                });
            }
        });
    }

    public async assignBenefits(patchAmount: boolean) {
        try {
            const test: any = await this.getSchemeDetails();
            const benefit_amount_patch = JSON.parse(this.schemeDetails.benefit_amount);
            this.benefitType.patchValue(test.benefit_type);
            if (this.schemeDetails.benefit_type === 'cash' && patchAmount) {
                this.benefitAmount.patchValue(benefit_amount_patch[0].benefit);
            }
        } catch (error) {
            alert(error.message)
        }
    }

    public getGenderPersonal(): void {
        this.httpService.getGenders().subscribe((data: any) => {
            this.genderPersonalArray = data;
        });
    }

    public getRelation(): void {
        this.httpService.getFamilyRelations().subscribe((data: any) => {
            this.getRelationArray = data;
        })
    }
    public getRelationWithoutSubscribe() {
        return this.httpService.getFamilyRelations();
    }

    public getEducation() {
        return this.httpService.getEducation();
    }

    public convertDateToNGBDateFormat(date: string) {
        date = moment(date).format('YYYY-MM-DD')
        const splittedDate = date.split('-');
        return {
            year: Number(splittedDate[0]),
            month: Number(splittedDate[1]),
            day: Number(splittedDate[2])
        };
    }

    changeToIonDateTime(diff: any, timeUnit: string) {
        const date = moment(
            new Date(this.todaysDate.year, this.todaysDate.month - 1, this.todaysDate.day))
            .subtract(diff, timeUnit).format('DD/MM/YYYY').split('/');
        return this.getIonDate(date);
    }

    getIonDate(date: any): string {
        if (Number(date[1]) < 10 && Number(date[0]) < 10) { return `${Number(date[2])}-0${Number(date[1])}-0${Number(date[0])}`; }
        else if (Number(date[1]) < 10 && Number(date[0]) >= 10) { return `${Number(date[2])}-0${Number(date[1])}-${Number(date[0])}`; }
        else if (Number(date[1]) >= 10 && Number(date[0]) < 10) { return `${Number(date[2])}-${Number(date[1])}-0${Number(date[0])}`; }
        else { return `${Number(date[2])}-${Number(date[1])}-${Number(date[0])}`; }
    }

    transliterateValue(event) {
        let target: any;
        const targetsArray = event.target.id;
        target = this.formGroup.get(`${targetsArray}_mr`);
        try {
            this.transliterate.transliterateText(event.target.value, 'NAME').subscribe((response: any) => {
                const result = response.split(';').map((item) => {
                    return item.split('^')[0];
                });

                target.patchValue(result.join(' '));
            }, (error) => {
                target.patchValue(sanscript.t(event.target.value, 'itrans', 'devanagari'));
            });
        } catch {
            target.patchValue('');
        }
    }

    getFileDetails(event) {
        const file = event.target.files[0];
        this.files[event.target.id] = file;
        this.toast.show('File uploaded successfully', '1000', 'bottom')
        this.fileOptions[event.target.id] = `${uuidv4()}.${file.name.split('.')[length]}.pdf`;
        // alert('File uploaded successfully')
        // if (event.target.files[0].size > 0 && event.target.files[0].size < 2097152 && (file.type === 'application/pdf' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === "image/png")) {
        //   this.toast.show('File uploaded successfully', '1000', 'bottom').subscribe((toast) => {
        //   });
        //   this.files[event.target.id] = file;
        //   this.fileOptions[event.target.id] = `${uuidv4()}.${file.name.split('.')[length]}.pdf`;
        // } else if (file.type !== 'application/pdf' && file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== "image/png") {
        //   this.registrationFormGroup.get(event.target.id).patchValue(null);
        //   this.toast.show('File Should Be PDF or JPG or PNG', '2000', 'bottom').subscribe((toast) => {
        //   });

        // } else {
        //   this.registrationFormGroup.get('supportingDocuments').get(event.target.id).patchValue(null);
        //   this.toast.show('File Should Be Less Than 2MB', '2000', 'bottom').subscribe((toast) => {
        //   });

        // }
    }

    /**
     * Passing Year Function
     */
    public yearOfPassing(event, gap: number = 0) {
        const inputYear = this.formGroup.get('year');
        const currentYear = new Date().getFullYear();
        const userRegistrationYear = Number(this.user.registrationDatePersonal.slice(0, 4)) - gap
        if (inputYear.value < userRegistrationYear) {
            this.wrongYearOfPassing = -1;
            this.toast.show('Invalid Year of Admission', '1000', 'bottom').subscribe(() => { });
            // returns the user input if correct
        } else if (inputYear.value > currentYear) {
            this.wrongYearOfPassing = 1;
            this.toast.show('Invalid Year of Admission', '1000', 'bottom').subscribe(() => { });
            this.formGroup.get('year').reset();
        }
        else {
            this.wrongYearOfPassing = 0;
        }
    }



    public calculateAge(date: string): number {
        const dob = moment(date).format('YYYY-MM-DD');
        const age = moment().diff(dob, 'years');
        return age;
    }


    public checkDateOfDeliveryHealth() {
        // date check
        if (this.formGroup.get('dateOfDeliveryHealth').touched && this.formGroup.get('dateOfDeliveryHealth').invalid) {
            this.formGroup.get('dateOfDeliveryHealth').reset();
        }
    }


    public checkDateOfTreatmentHealth() {
        // date check
        if (this.formGroup.get('dateOfTreatment').touched && this.formGroup.get('dateOfTreatment').invalid) {
            this.formGroup.get('dateOfTreatment').reset();
        }
    }

    public checkDateOfOp() {
        //date check
        if (this.formGroup.get('dateOfOp').touched && this.formGroup.get('dateOfOp').invalid) {
            this.formGroup.get('dateOfOp').reset();
        }
    }

    public checkDate() {
        //date check
        if (this.formGroup.get('date').touched && this.formGroup.get('date').invalid) {
            this.formGroup.get('date').reset();
        }
    }

    public checkAdmissionDate() {
        if (this.formGroup.get('dateOfAdmission').touched && this.formGroup.get('dateOfAdmission').invalid) {
            this.formGroup.get('dateOfAdmission').reset();
        }
    }

    public joinWfcNames(wfcs) {
        const wfcNames = wfcs.map((wf) => {
            return wf.office_name;
        });
        return wfcNames.join(' or ');
    }

    protected saveClaimForm(postObj: object) {
        const formData = new FormData();
        for (const item in this.files) {
            if (this.files[item]) {
                formData.append('files', this.files[item], this.fileOptions[item]);
            }
        }
        formData.append('data', JSON.stringify(postObj));
        formData.append('modeOfApplication', 'Claim By Field Agent');

        this.claimHttpService.applyForClaim(formData, this.JWTToken).subscribe((res: any) => {
            if (res) {
                this.dialogs.alert(`Data Captured 👍🙂. Your Acknowledgement Number is ${res.data.acknowledgementNo}. Please visit below WFC with original documents for verification : ${res.data.wfcDetail.office_name}`);
                alert(`Data Captured 👍🙂. Your Acknowledgement Number is ${res.data.acknowledgementNo}. Please visit below WFC with original documents for verification : ${res.data.wfcDetail.office_name}`)

                alert('Scheme Claimed Successfully');
                this.router.navigate(['/dashboard'])
            }
        }, (error: Error) => {
            // this.dialogs.
            alert(error['error'].message,
            )
this.dialogs.alert(error['error'].message)

        });
    }



}
