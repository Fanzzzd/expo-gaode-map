import * as React from 'react';
import type { Coordinates, ExpoGaodeMapNaviViewProps } from './types';
import { createLazyNativeViewManager } from './map/utils/lazyNativeViewManager';

/**
 * ExpoGaodeMapNaviView Ref 类型
 */
export interface ExpoGaodeMapNaviViewRef {
  /**
   * 开始导航
   * @param start 起点坐标，传 null 则使用当前定位
   * @param end 终点坐标
   */
  startNavigation: (start: Coordinates | null, end: Coordinates) => Promise<void>;

  /**
   * 停止导航
   */
  stopNavigation: () => Promise<void>;

  /**
   * 播放自定义语音
   * @param text 要播报的文本
   * @param forcePlay 是否强制播放（中断当前播报）
   */
  playCustomTTS: (text: string, forcePlay?: boolean) => Promise<{ success: boolean }>;
}

interface NativeExpoGaodeMapNaviViewRef {
  startNavigation: (
    startLatitude: number,
    startLongitude: number,
    endLatitude: number,
    endLongitude: number
  ) => Promise<void>;
  stopNavigation: () => Promise<void>;
  playCustomTTS: (text: string, forcePlay: boolean) => Promise<{ success: boolean }>;
}

const getNativeView = createLazyNativeViewManager<
  ExpoGaodeMapNaviViewProps & { ref?: React.Ref<NativeExpoGaodeMapNaviViewRef> }
>('ExpoGaodeMapNaviView');

/**
 * 高德导航视图组件
 *
 * 使用高德官方的导航界面，提供完整的导航体验，包括：
 * - 路线规划和显示
 * - 实时导航信息（距离、时间、道路名称）
 * - 转向箭头和提示
 * - 路况信息
 * - 摄像头提示
 * - 语音播报
 *
 * @example
 * ```tsx
 * import { ExpoGaodeMapNaviView } from 'expo-gaode-map-navigation';
 *
 * function NavigationScreen() {
 *   return (
 *     <ExpoGaodeMapNaviView
 *       style={{ flex: 1 }}
 *       naviType={0} // GPS 导航
 *       showCamera={true}
 *       enableVoice={true}
 *       onNavigationInfoUpdate={(e) => {
 *         console.log('剩余距离:', e.nativeEvent.pathRetainDistance);
 *       }}
 *       onArriveDestination={() => {
 *         console.log('到达目的地！');
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export const ExpoGaodeMapNaviView = React.forwardRef<ExpoGaodeMapNaviViewRef, ExpoGaodeMapNaviViewProps>((props, ref) => {
  const nativeRef = React.useRef<NativeExpoGaodeMapNaviViewRef | null>(null);
  const NativeView = React.useMemo(() => getNativeView(), []);

  // 创建 API 引用
  const apiRef: ExpoGaodeMapNaviViewRef = React.useMemo(() => ({
    startNavigation: async (start: Coordinates | null, end: Coordinates) => {
      if (!nativeRef.current) throw new Error('ExpoGaodeMapNaviView not initialized');
      const startLat = start?.latitude ?? 0;
      const startLng = start?.longitude ?? 0;
      const endLat = end.latitude;
      const endLng = end.longitude;
      return nativeRef.current.startNavigation(startLat, startLng, endLat, endLng);
    },
    stopNavigation: async () => {
      if (!nativeRef.current) throw new Error('ExpoGaodeMapNaviView not initialized');
      return nativeRef.current.stopNavigation();
    },
    playCustomTTS: async (text: string, forcePlay: boolean = false) => {
      if (!nativeRef.current) throw new Error('ExpoGaodeMapNaviView not initialized');
      return nativeRef.current.playCustomTTS(text, forcePlay);
    },
  }), []);

  // 暴露 API 给外部 ref
  React.useImperativeHandle(ref, () => apiRef, [apiRef]);

  return <NativeView ref={nativeRef} {...props} />;
});

ExpoGaodeMapNaviView.displayName = 'ExpoGaodeMapNaviView';

export default ExpoGaodeMapNaviView;
