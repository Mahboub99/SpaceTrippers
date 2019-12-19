#version 300 es
precision highp float;

//TODO: Modify as needed
 
in vec2 v_screencoord;

out vec4 color;

uniform sampler2D color_sampler;
uniform sampler2D depth_sampler;
uniform sampler2D motion_sampler;
uniform mat4 P_i; // Projection matrix inverse
uniform mat4 prevVP;


const int WINDOW = 32;
const float sigma = 40.0;

void main(){

   color = texture(color_sampler, v_screencoord); // Sample texture color and send it as is
}