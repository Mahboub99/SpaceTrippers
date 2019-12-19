#version 300 es
precision highp float;

in vec2 v_screencoord;

out vec4 color;

uniform sampler2D color_sampler;

void main(){
    color = texture(color_sampler, v_screencoord); // Sample texture color and send it as is
}