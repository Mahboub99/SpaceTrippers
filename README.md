# WebGL Assignment 2

## Requirement: **Motion Blur**

Modify the scene code and the shader to create motion blur. The files that need modification are:
- `src/scenes/01-MotionBlur.ts`
- `static/shaders/mrt.vert`
- `static/shaders/mrt.frag`
- `static/shaders/postprocess/motion-blur.frag`

You will find one or more **`//TODO:`** comments in each of these files.

![with-motion-blur](examples/with-motion-blur.png)
*With Motion Blur* (the house is moving by the way)
![without-motion-blur](examples/without-motion-blur.png)
*Without Motion Blur*

## HINT

The steps to do motion blur is as follows:
- While rendering the scene to a color render target, we need to render the motion vectors into another render target.
- The motion vector is the vector from the pixel's world-space position during the previous frame to the pixel's world-space position during the current frame. We need the model matrices in both the current and the previous frame to calculate the motion vector. You don't need to calculate those matrices, they are already both supplied inside every object in the scene.
- During post processing we need to find where the pixel was during the last frame. To do that, we need the view-projection matrix in both the current and previous frame in addition to the motion vectors.
- First, we take the pixel's depth and the pixel's screen coordinates, use them to reconstruct the pixel's position in Normalized Device Coordinates then transform it back to the world-space using the inverse of the current frame's view-projection matrix.
- Then, we subtract the pixel's motion vector from the pixel's world position to get its world position in the previous frame.
- Finally, we transform the pixel to the Normalized Device Coordinates of the previous frame using the previous frame's view-projection matrix. We can use these coodinates to get the pixel's screen coordinates in the previous frame.
- Using the pixel's screen coordinates in both frames, we can sample the color texture from multiple locations along the line between both screen coordinates and compute the average. The computed average will be the new color. Now we have motion blur.

## Extra Resources

* [Mozilla WebGL Reference and Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) which is for WebGL1 but many of the presented material is still valid for WebGL2.
* [WebGL2 Fundamentals](https://webgl2fundamentals.org/)
* [Khronos WebGL2 Reference Guide](https://www.khronos.org/files/webgl20-reference-guide.pdf)
* [Mozilla WebGL2 API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext)
* [Mouse Picking with Ray Casting](http://antongerdelan.net/opengl/raycasting.html) by Anton Gerdelan.
* [WebGL2 Samples](https://github.com/WebGLSamples/WebGL2Samples)
* [GLSL Reference](https://www.khronos.org/opengles/sdk/docs/manglsl/docbook4/)