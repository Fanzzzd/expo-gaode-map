import { ViewProps, NativeSyntheticEvent } from "react-native";

// ========== 事件类型 ==========

/** 导航就绪事件 */
export interface NavigationReadyEvent {}

/** 导航开始事件 */
export interface NavigationStartedEvent {
  type: number;
  isEmulator: boolean;
}

/** 导航失败事件 */
export interface NavigationFailedEvent {
  error: string;
  message?: string;
}

/** 导航结束事件 */
export interface NavigationEndedEvent {}

/** 位置更新事件 */
export interface LocationUpdateEvent {
  latitude: number;
  longitude: number;
  speed: number;
  bearing: number;
}

/** 导航语音播报事件 */
export interface NavigationTextEvent {
  text: string;
  type?: number;
}

/** 到达目的地事件 */
export interface ArriveDestinationEvent {}

/** 路径规划结果事件（成功和失败统一） */
export interface RouteCalculatedEvent {
  success: boolean;
  naviType?: number;
  errorCode?: number;
  errorInfo?: string;
}

/** 路线重算事件 */
export interface RouteRecalculateEvent {
  reason: string;
}

/** 途经点到达事件 */
export interface WayPointArrivedEvent {
  index: number;
}

/** GPS 状态变化事件 */
export interface GpsStatusChangedEvent {
  enabled: boolean;
}

/** 导航信息更新事件 */
export interface NavigationInfoUpdateEvent {
  currentRoadName: string;
  nextRoadName: string;
  pathRetainDistance: number;
  pathRetainTime: number;
  curStepRetainDistance: number;
  curStepRetainTime: number;
}

/** GPS 信号弱事件 */
export interface GpsSignalWeakEvent {
  isWeak: boolean;
}

// ========== 已废弃的事件类型别名（向后兼容） ==========

/** @deprecated 使用 NavigationInfoUpdateEvent 代替 */
export type NaviInfoUpdateEvent = NavigationInfoUpdateEvent;
/** @deprecated 使用 NavigationStartedEvent 代替 */
export type NaviStartEvent = NavigationStartedEvent;
/** @deprecated 使用 NavigationEndedEvent 代替 */
export type NaviEndEvent = NavigationEndedEvent;
/** @deprecated 使用 ArriveDestinationEvent 代替 */
export type NaviArriveEvent = ArriveDestinationEvent;
/** @deprecated 使用 RouteCalculatedEvent 代替 */
export type CalculateRouteSuccessEvent = RouteCalculatedEvent;
/** @deprecated 使用 RouteCalculatedEvent 代替 */
export type CalculateRouteFailureEvent = RouteCalculatedEvent;
/** @deprecated 使用 RouteRecalculateEvent 代替 */
export type ReCalculateEvent = RouteRecalculateEvent;
/** @deprecated 使用 NavigationTextEvent 代替 */
export type PlayVoiceEvent = NavigationTextEvent;

/**
 * 导航视图属性
 */
export interface ExpoGaodeMapNaviViewProps extends ViewProps {
  /**
   * 导航类型
   * - 0: GPS 导航
   * - 1: 模拟导航
   */
  naviType?: number;

  /**
   * 是否启用语音播报
   * @default true
   */
  enableVoice?: boolean;

  /**
   * 是否显示摄像头
   * @default true
   */
  showCamera?: boolean;

  /**
   * 是否自动锁车（非锁车模式7秒后自动切换为锁车模式）
   * @default true
   */
  autoLockCar?: boolean;

  /**
   * 是否开启自动缩放（锁车模式下自动缩放地图以预见下一导航动作）
   * @default true
   */
  autoChangeZoom?: boolean;

  /**
   * 是否显示交通路况
   * @default true
   */
  trafficLayerEnabled?: boolean;

  /**
   * 是否显示路口放大图
   * @default true
   */
  realCrossDisplay?: boolean;

  /**
   * 导航视角模式
   * - 0: 车头朝上 (carNorth)
   * - 1: 正北朝上 (mapNorth)
   * @default 0
   */
  naviMode?: number;

  /**
   * 导航显示模式
   * - 1: 锁车态 (carPositionLocked) - 自车图标锁定在屏幕固定位置
   * - 2: 全览态 (overview) - 整条路线显示在可见区域内
   * - 3: 普通态 (normal) - 地图不动，自车图标移动
   * @default 1
   */
  showMode?: number;

  /**
   * 是否开启夜间模式
   * @default false
   */
  isNightMode?: boolean;

  /**
   * 是否显示自车和罗盘
   * @platform android
   * @default true
   * @since 6.2.0
   */
  carOverlayVisible?: boolean;


  /**
   * 路线标记点可见性配置
   * @platform android
   * @since 9.0.0
   */
  routeMarkerVisible?: {
    /** 是否显示起终途点 @default true */
    showStartEndVia?: boolean;
    /** 是否显示步行轮渡扎点 @default true */
    showFootFerry?: boolean;
    /** 是否显示禁行限行封路icon @default true */
    showForbidden?: boolean;
    /** 是否显示路线起点icon @default true @since 9.0.0 */
    showRouteStartIcon?: boolean;
    /** 是否显示路线终点icon @default true @since 9.0.0 */
    showRouteEndIcon?: boolean;
  };

  /**
   * 是否显示路线转向箭头
   * @platform android
   * @default true
   * @since 6.3.0
   */
  naviArrowVisible?: boolean;

  /**
   * 是否显示拥堵气泡
   * @platform android
   * @default true
   * @since 10.0.5
   */
  showDriveCongestion?: boolean;

  /**
   * 是否显示红绿灯倒计时气泡
   * @platform android
   * @default true
   * @since 10.0.5
   */
  showTrafficLightView?: boolean;


  /**
   * 导航界面顶部与状态栏的间距（单位：dp）
   * @platform android
   * @default 状态栏高度（单位：dp）
   */
  androidStatusBarPaddingTop?: number;

  // ========== iOS 特有属性 ==========

  /**
   * 是否显示路线
   * @platform ios
   * @default true
   */
  showRoute?: boolean;


  /**
   * 是否显示路况光柱
   * @default true
   */
  showTrafficBar?: boolean;

  /**
   * 是否显示全览按钮
   *
   * @default true
   */
  showBrowseRouteButton?: boolean;

  /**
   * 是否显示更多按钮
   * @platform ios
   * @default true
   */
  showMoreButton?: boolean;

  /**
   * 是否显示实时交通按钮
   *
   * @default true
   */
  showTrafficButton?: boolean;

  /**
   * 是否显示界面元素（设为false可完全自定义界面）
   * @default true
   */
  showUIElements?: boolean;

  /**
   * 走过的路线是否置灰
   *
   * @default false
   */
  showGreyAfterPass?: boolean;

  /**
   * 是否显示牵引线（起点到终点的飞线）
   *
   * @default true
   */
  showVectorline?: boolean;

  /**
   * 设置是否为骑步行视图
   * @platform android
   * @default false
   */
  isNaviTravelView?: boolean;

  /**
   * 是否显示指南针
   * @default true
   */
  showCompassEnabled?: boolean;

  /**
   * 是否显示红绿灯图标
   * @default true
   */
  showTrafficLights?: boolean;

  /**
   * 地图样式类型
   * - 0: 白天模式 (day)
   * - 1: 黑夜模式 (night)
   * - 2: 根据日出日落自动切换 (dayNightAuto)
   * - 3: 自定义地图样式 (custom)
   * @platform ios
   * @default 0
   */
  mapViewModeType?: number;

  /**
   * 路线polyline的宽度，设置0恢复默认宽度
   * @platform ios
   */
  lineWidth?: number;

  // ========== 事件回调 ==========

  /**
   * 导航视图就绪回调
   */
  onNavigationReady?: (event: NativeSyntheticEvent<NavigationReadyEvent>) => void;

  /**
   * 导航开始回调
   */
  onNavigationStarted?: (event: NativeSyntheticEvent<NavigationStartedEvent>) => void;

  /**
   * 导航初始化失败回调
   */
  onNavigationFailed?: (event: NativeSyntheticEvent<NavigationFailedEvent>) => void;

  /**
   * 导航结束回调
   */
  onNavigationEnded?: (event: NativeSyntheticEvent<NavigationEndedEvent>) => void;

  /**
   * 位置更新回调
   */
  onLocationUpdate?: (event: NativeSyntheticEvent<LocationUpdateEvent>) => void;

  /**
   * 导航语音播报回调
   */
  onNavigationText?: (event: NativeSyntheticEvent<NavigationTextEvent>) => void;

  /**
   * 到达目的地回调
   */
  onArriveDestination?: (event: NativeSyntheticEvent<ArriveDestinationEvent>) => void;

  /**
   * 路径规划结果回调（包含成功和失败）
   */
  onRouteCalculated?: (event: NativeSyntheticEvent<RouteCalculatedEvent>) => void;

  /**
   * 路线重算回调
   */
  onRouteRecalculate?: (event: NativeSyntheticEvent<RouteRecalculateEvent>) => void;

  /**
   * 途经点到达回调
   */
  onWayPointArrived?: (event: NativeSyntheticEvent<WayPointArrivedEvent>) => void;

  /**
   * GPS 状态变化回调
   */
  onGpsStatusChanged?: (event: NativeSyntheticEvent<GpsStatusChangedEvent>) => void;

  /**
   * 导航信息更新回调（距离、时间、路名等）
   */
  onNavigationInfoUpdate?: (event: NativeSyntheticEvent<NavigationInfoUpdateEvent>) => void;

  /**
   * GPS 信号弱回调
   */
  onGpsSignalWeak?: (event: NativeSyntheticEvent<GpsSignalWeakEvent>) => void;
}
