import SyIcon from './sy-icon.vue';
import SyAimIcon from './aim.vue';
import SyAllApplication from './all-application.vue';
import SyArrowDown from './arrow-down.vue';
import SyArrowLeftDown from './arrow-left-down.vue';
import SyArrowLeftUp from './arrow-left-up.vue';
import SyArrowLeft from './arrow-left.vue';
import SyArrowRightDown from './arrow-right-down.vue';
import SyArrowRightUp from './arrow-right-up.vue';
import SyArrowRight from './arrow-right.vue';
import SyArrowUp from './arrow-up.vue';
import SyBill from './bill.vue';
import SyBookMark from './book-mark.vue';
import SyBookmarkOne from './bookmark-one.vue';
import SyCamera from './camera.vue';
import SyCheckOne from './check-one.vue';
import SyCheckSmall from './check-small.vue';
import SyCheck from './check.vue';
import SyCloseOne from './close-one.vue';
import SyCloseSmall from './close-small.vue';
import SyClose from './close.vue';
import SyConfig from './config.vue';
import SyDeleteTwo from './delete-two.vue';
import SyDislikeTwo from './dislike-two.vue';
import SyDislike from './dislike.vue';
import SyEqualizer from './equalizer.vue';
import SyFemale from './female.vue';
import SyHamburgerButton from './hamburger-button.vue';
import SyHome from './home.vue';
import SyHourglassFull from './hourglass-full.vue';
import SyHourglassNull from './hourglass-null.vue';
import SyLightning from './lightning.vue';
import SyLike from './like.vue';
import SyLoadingFour from './loading-four.vue';
import SyLoading from './loading.vue';
import SyMale from './male.vue';
import SyMoreApp from './more-app.vue';
import SyMoreOne from './more-one.vue';
import SyMoreTwo from './more-two.vue';
import SyMore from './more.vue';
import SyPic from './pic.vue';
import SyPower from './power.vue';
import SyPreviewCloseOne from './preview-close-one.vue';
import SyPreviewClose from './preview-close.vue';
import SyPreviewOpen from './preview-open.vue';
import SyRadar from './radar.vue';
import SyRefresh from './refresh.vue';
import SyRss from './rss.vue';
import SySaveOne from './save-one.vue';
import SySave from './save.vue';
import SySearch from './search.vue';
import SySettingConfig from './setting-config.vue';
import SySettingOne from './setting-one.vue';
import SySettingThree from './setting-three.vue';
import SySettingTwo from './setting-two.vue';
import SySetting from './setting.vue';
import SyShareThree from './share-three.vue';
import SyShare from './share.vue';
import SySleep from './sleep.vue';
import SySystem from './system.vue';
import SyTagOne from './tag-one.vue';
import SyTag from './tag.vue';
import SyTips from './tips.vue';
import SyTool from './tool.vue';
import SyTranslate from './translate.vue';
import SyUnlike from './unlike.vue';
import SyWaterfallsH from './waterfalls-h.vue';
import SyWaterfallsV from './waterfalls-v.vue';
import SyZoomIn from './zoom-in.vue';
import SyZoomOut from './zoom-out.vue';
import { getIconComponent, listRegisteredIcons, registerIcon, registerIcons } from './registry';

const builtInIcons = {
	aim: SyAimIcon,
	'all-application': SyAllApplication,
	'arrow-down': SyArrowDown,
	'arrow-left-down': SyArrowLeftDown,
	'arrow-left-up': SyArrowLeftUp,
	'arrow-left': SyArrowLeft,
	'arrow-right-down': SyArrowRightDown,
	'arrow-right-up': SyArrowRightUp,
	'arrow-right': SyArrowRight,
	'arrow-up': SyArrowUp,
	bill: SyBill,
	'book-mark': SyBookMark,
	'bookmark-one': SyBookmarkOne,
	camera: SyCamera,
	'check-one': SyCheckOne,
	'check-small': SyCheckSmall,
	check: SyCheck,
	'close-one': SyCloseOne,
	'close-small': SyCloseSmall,
	close: SyClose,
	config: SyConfig,
	'delete-two': SyDeleteTwo,
	'dislike-two': SyDislikeTwo,
	dislike: SyDislike,
	equalizer: SyEqualizer,
	female: SyFemale,
	'hamburger-button': SyHamburgerButton,
	home: SyHome,
	'hourglass-full': SyHourglassFull,
	'hourglass-null': SyHourglassNull,
	lightning: SyLightning,
	like: SyLike,
	'loading-four': SyLoadingFour,
	loading: SyLoading,
	male: SyMale,
	'more-app': SyMoreApp,
	'more-one': SyMoreOne,
	'more-two': SyMoreTwo,
	more: SyMore,
	pic: SyPic,
	power: SyPower,
	'preview-close-one': SyPreviewCloseOne,
	'preview-close': SyPreviewClose,
	'preview-open': SyPreviewOpen,
	radar: SyRadar,
	refresh: SyRefresh,
	rss: SyRss,
	'save-one': SySaveOne,
	save: SySave,
	search: SySearch,
	'setting-config': SySettingConfig,
	'setting-one': SySettingOne,
	'setting-three': SySettingThree,
	'setting-two': SySettingTwo,
	setting: SySetting,
	'share-three': SyShareThree,
	share: SyShare,
	sleep: SySleep,
	system: SySystem,
	'tag-one': SyTagOne,
	tag: SyTag,
	tips: SyTips,
	tool: SyTool,
	translate: SyTranslate,
	unlike: SyUnlike,
	'waterfalls-h': SyWaterfallsH,
	'waterfalls-v': SyWaterfallsV,
	'zoom-in': SyZoomIn,
	'zoom-out': SyZoomOut,
};

registerIcons(builtInIcons);

export {
	SyIcon,
	SyAimIcon,
	SyAllApplication,
	SyArrowDown,
	SyArrowLeftDown,
	SyArrowLeftUp,
	SyArrowLeft,
	SyArrowRightDown,
	SyArrowRightUp,
	SyArrowRight,
	SyArrowUp,
	SyBill,
	SyBookMark,
	SyBookmarkOne,
	SyCamera,
	SyCheckOne,
	SyCheckSmall,
	SyCheck,
	SyCloseOne,
	SyCloseSmall,
	SyClose,
	SyConfig,
	SyDeleteTwo,
	SyDislikeTwo,
	SyDislike,
	SyEqualizer,
	SyFemale,
	SyHamburgerButton,
	SyHome,
	SyHourglassFull,
	SyHourglassNull,
	SyLightning,
	SyLike,
	SyLoadingFour,
	SyLoading,
	SyMale,
	SyMoreApp,
	SyMoreOne,
	SyMoreTwo,
	SyMore,
	SyPic,
	SyPower,
	SyPreviewCloseOne,
	SyPreviewClose,
	SyPreviewOpen,
	SyRadar,
	SyRefresh,
	SyRss,
	SySaveOne,
	SySave,
	SySearch,
	SySettingConfig,
	SySettingOne,
	SySettingThree,
	SySettingTwo,
	SySetting,
	SyShareThree,
	SyShare,
	SySleep,
	SySystem,
	SyTagOne,
	SyTag,
	SyTips,
	SyTool,
	SyTranslate,
	SyUnlike,
	SyWaterfallsH,
	SyWaterfallsV,
	SyZoomIn,
	SyZoomOut,
	getIconComponent,
	registerIcon,
	registerIcons,
	listRegisteredIcons,
};
