import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { App, AlertController, ToastController, NavController, ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { IDocument } from '../../models/IDocuments';
import { IComment } from '../../models/IComment';
import { Observable } from 'rxjs/Observable';
import { FileManager } from '../../providers/data-service/file-service';
import { LocalSession } from '../../providers/session/local-session';
import { FileCommentManager } from '../../providers/data-service/file-comments-service';

@Component({
    selector: 'file-details-page',
    templateUrl: 'file-details.html'
})
export class FileDetailPage {
    private selectedFile: Observable<IDocument>;
    private comments: Observable<IComment[]>;
    private temp: IDocument;
    private commentForm;

    constructor(
        private fileManager: FileManager,
        private fileCommentManager: FileCommentManager,
        private formBuilder: FormBuilder,
        private app: App,
        public navCtrl: NavController,
        private alertController: AlertController,
        private toastController: ToastController,
        private actionSheetController: ActionSheetController,
        private localSession: LocalSession
    ) {
        // TODO A better approach should be implemented here...
        if (typeof this.localSession.getFileId() != 'undefined') {
            this.selectedFile = this.fileManager.getFileById(this.localSession.getFileId());
            this.comments = this.fileCommentManager.getCommentsByFile(this.localSession.getFileId());
            console.log(this.selectedFile);
        }
    }

    ngOnInit() {
        this.commentForm = this.formBuilder.group({
            message: this.formBuilder.control('', Validators.required)
        })
    }


    updateFile() {
        // nothingyet
        this.fileManager.updateFile();
    }

    showDeleteFileAlert() {
        let confirm = this.alertController.create({
            title: 'Deleting File',
            message: 'Are you sure you want to delete this file?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('cancel');
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: ()=> {
                        this.deleteFile();
                    } 
                }
            ]
        });
        confirm.present();
    }

    private deleteFile() {
        // nothing yet
        if (typeof this.localSession.getFileId() != 'undefined') {
            this.fileManager.deleteFile(this.localSession.getFileId());
            this.navCtrl.popToRoot();
        }
    }

    // fix this as well with a form builder 
    commentFile(comment: IComment) {
        if (typeof this.localSession.getFileId() != 'undefined') {
            //this.fileManager.commentFile(this.localSession.getFileId(), comment);
            comment.fileId = this.localSession.getFileId();
            this.fileCommentManager.addCommment(comment);
            this.showCommentMessage();
        }
    }

    private showCommentMessage() {
        let toast = this.toastController.create({
            message: 'Your comment was added!',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    downloadFile(name: string) {
        this.fileManager.downloadFile(name);
    }

    fileActions() {
        let actionSheet = this.actionSheetController.create({
            title: 'Modify File',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        console.log('File Deleted!');
                        this.showDeleteFileAlert();
                    }

                },
                {
                    text: 'Update File',
                    handler: () => {
                        console.log('Update File Form Called');
                        this.showPendingFeatureMsg();
                    }

                },
                {
                    text: 'Download File',
                    handler: () => {
                        console.log('Download File called!');
                        this.showPendingFeatureMsg();
                    }

                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('cancel');
                    }
                }
            ]
        });
        actionSheet.present();
    }
    

    /*loadFile(id: string) : IDocument {
        let temp = this.fileManager.getFileById(id).subscribe((data:IDocument) =>{
            new DetailView(temp);
        });
    }*/

    showCommentPrompt() {
        let alert = this.alertController.create({
            title: 'Add Comment',
            subTitle: 'Your opinion matters!',
            inputs: [
                {
                    name: 'message',
                    placeholder: 'Your comment...'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('cancel');
                    }
                },
                {
                    text: 'Add',
                    handler: data => {
                        if (typeof data.message.trim() != 'undefined' && data.message.trim() != '') {
                            if (typeof this.localSession.getFileId() != 'undefined') {
                                let comment : IComment = {
                                    fileId: this.localSession.getFileId(),
                                    userId: null,
                                    message: data.message,
                                    createdAt: null
                                };
                                this.fileCommentManager.addCommment(comment);
                                this.showCommentMessage();
                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    showPendingFeatureMsg() {
        let alert = this.alertController.create({
            title: 'Pending Feature',
            subTitle: 'Feature not implemented',
            message: 'Feature will be implemented in the upcoming software releases.',
            buttons: ['Ok']
        });
        alert.present();
    }
}

class DetailView {
    constructor(
        public document : IDocument
    ) {}
}